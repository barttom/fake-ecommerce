import {mapStringArrayToOptions} from '../helpers';

const sampleArray = ['bAtmaN', 'superMAN'];

describe('mapStringArrayToOptions', function () {
  it('Returns empty array in case of none parameter', () => {
    const results = mapStringArrayToOptions();

    expect(results).toHaveLength(0);
  });

  it('Returns element as an option object', () => {
    const results = mapStringArrayToOptions(sampleArray);

    expect(results[1].label).toBe(sampleArray[0].toUpperCase());
    expect(results[1].value).toBe(sampleArray[0].toLowerCase());
  });
});
