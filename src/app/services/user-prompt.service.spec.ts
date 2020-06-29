import { TestBed } from '@angular/core/testing';

import { UserPromptService } from './user-prompt.service';

describe('UserPromptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPromptService = TestBed.get(UserPromptService);
    expect(service).toBeTruthy();
  });
});
