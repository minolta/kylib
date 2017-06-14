import { KylibPage } from './app.po';

describe('kylib App', () => {
  let page: KylibPage;

  beforeEach(() => {
    page = new KylibPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
