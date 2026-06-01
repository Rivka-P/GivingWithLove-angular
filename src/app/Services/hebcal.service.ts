import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HebcalService {
  private http = inject(HttpClient);
  private cache = new Map<string, string>(); // key: 'YYYY-MM' -> 'כסלו תשפד'

  getHebrewMonthForIso(isoDate: string): Observable<string> {
    const yyyymm = isoDate.slice(0, 7); // 'YYYY-MM'
    if (this.cache.has(yyyymm)) return of(this.cache.get(yyyymm)!);

    const dateForApi = `${yyyymm}-01`;
    const url = `https://www.hebcal.com/converter?cfg=json&date=${dateForApi}&g2h=1`;
    return this.http.get<any>(url).pipe(
      map(r => {
        const heb = (r?.hebrew ?? '').toString();
        const parts = heb.split(' ');
        const monthYear = parts.slice(1).join(' ');
        return monthYear || yyyymm;
      }),
      tap(h => this.cache.set(yyyymm, h))
    );
  }

  // Convert a Hebrew date (day, monthNameEnglish, yearNumber) to ISO gregorian (YYYY-MM-DD)
  // Uses hebcal.com converter (h2g=1). Returns observable of ISO string.
  hebToIso(hebDay: number, hebMonthEn: string, hebYear: number): Observable<string> {
    const hebDate = `${hebDay} ${hebMonthEn} ${hebYear}`;
    const url = `https://www.hebcal.com/converter?cfg=json&date=${encodeURIComponent(hebDate)}&h2g=1`;
    return this.http.get<any>(url).pipe(
      map(r => {
        // Try multiple possible shapes from the API response
        // Common possibility: r.gregorian = { year, month, day }
        const greg = r?.gregorian ?? r?.gd ?? null;
        let y: number | undefined;
        let m: number | undefined;
        let d: number | undefined;
        if (greg) {
          y = greg.year ?? greg.y ?? greg.gy ?? greg["year"];
          m = greg.month ?? greg.m ?? greg.gm ?? greg["month"];
          d = greg.day ?? greg.d ?? greg.gd ?? greg["day"];
        }
        // Fallback to top-level fields
        y = y ?? r?.gy ?? r?.year ?? undefined;
        m = m ?? r?.gm ?? r?.month ?? undefined;
        d = d ?? r?.gd ?? r?.day ?? undefined;

        if (y && m && d) {
          const mm = String(m).padStart(2, '0');
          const dd = String(d).padStart(2, '0');
          return `${y}-${mm}-${dd}`;
        }

        // If structure unexpected, try to parse r.date or r.gregorianString
        const altDate = r?.date ?? r?.gregorianDate ?? r?.gregorianString ?? '';
        if (typeof altDate === 'string' && altDate.length > 0) {
          // attempt to extract yyyy-mm-dd
          const mres = altDate.match(/(\d{4})-(\d{2})-(\d{2})/);
          if (mres) return `${mres[1]}-${mres[2]}-${mres[3]}`;
        }

        throw new Error('Hebcal conversion failed: unexpected response');
      })
    );
  }
}
