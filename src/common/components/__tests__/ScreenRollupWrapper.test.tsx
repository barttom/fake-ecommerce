import React from 'react';
import {screen, waitFor} from '@testing-library/react-native';
import {Text} from 'react-native';
import {renderWithProviders} from '../../utils/testHelpers';
import {ScreenRollupWrapper} from '../ScreenRollupWrapper';

describe('<ScreenRollupWrapper/>', () => {
  it('Renders correctly', async () => {
    renderWithProviders(
      <ScreenRollupWrapper animationDuration={100}>
        <Text>My content</Text>
      </ScreenRollupWrapper>,
    );

    expect(screen.getByText('My content')).not.toBeVisible();
    await waitFor(
      () => {
        expect(screen.getByText('My content')).not.toBeVisible();
      },
      {timeout: 200},
    );
  });

  it('Renders properly loading status', async function () {
    renderWithProviders(
      <ScreenRollupWrapper isLoading animationDuration={100}>
        <Text>My content</Text>
      </ScreenRollupWrapper>,
    );

    expect(screen.queryByText('My content')).toBeNull();
    expect(screen.getByLabelText('Loading indicator')).toBeOnTheScreen();
  });
});
