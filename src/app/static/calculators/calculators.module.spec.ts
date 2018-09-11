import { CalculatorsModule } from "./calculatorsModule";

describe('CalculatorsModule', () => {
  let calculatorsModule: CalculatorsModule;

  beforeEach(() => {
    calculatorsModule = new CalculatorsModule();
  });

  it('should create an instance', () => {
    expect(calculatorsModule).toBeTruthy();
  });
});
