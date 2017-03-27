import { LambdalyticsPage } from './app.po';

describe('lambdalytics App', () => {
  let page: LambdalyticsPage;

  beforeEach(() => {
    page = new LambdalyticsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
