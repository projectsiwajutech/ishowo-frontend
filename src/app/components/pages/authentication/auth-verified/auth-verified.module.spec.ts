import { AuthVerifiedModule } from './auth-verified.module';

describe('AuthResetPasswordModule', () => {
  let authVerifiedModule: AuthVerifiedModule;

  beforeEach(() => {
    authVerifiedModule = new AuthVerifiedModule();
  });

  it('should create an instance', () => {
    expect(authVerifiedModule).toBeTruthy();
  });
});
