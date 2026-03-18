import { VolunteerDomainService } from './volunteer-domain-service';

describe('VolunteerDomainService', () => {
  it('should create an instance', () => {
    const directive = new VolunteerDomainService();
    expect(directive).toBeTruthy();
  });
});
