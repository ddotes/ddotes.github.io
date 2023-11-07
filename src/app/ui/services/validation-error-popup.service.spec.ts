import { TestBed } from '@angular/core/testing';

import { ValidationErrorPopupService } from './validation-error-popup.service';

describe('ValidationErrorPopupService', () => {
  let service: ValidationErrorPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationErrorPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
