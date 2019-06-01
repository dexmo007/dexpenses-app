import defaultLayout from '@/components/dashboard/default-layout';
import { parseLayout } from '@/util/dashboard';
import Mockdate from 'mockdate';

Mockdate.set(new Date('2019-05-15T00:00:00.000Z'));

describe('dashboard/default-layout', () => {
  it('should be parsed correctly', () => {
    expect(parseLayout(defaultLayout)).toMatchSnapshot();
  });
});