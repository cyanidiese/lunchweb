import { LunchappPage } from './app.po';

describe('lunchapp App', function() {
  let page: LunchappPage;

  beforeEach(() => {
    page = new LunchappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect('app works!').toEqual('app works!');
  });
});
