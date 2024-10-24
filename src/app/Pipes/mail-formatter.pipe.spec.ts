import { MailFormatterPipe } from './mail-formatter.pipe';

describe('MailFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new MailFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
