import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import ColorList from './ColorList';

const testColorList = [
    {
        color: 'aliceblue',
        code: {
            hex: '#f0f8ff',
        },
        id: 1,
    },
    {
        color: 'limegreen',
        code: {
            hex: '#99ddbc',
        },
        id: 2,
    },
    {
        color: 'aquamarine',
        code: {
            hex: '#7fffd4',
        },
        id: 3,
    },
];

test("Renders an empty list of colors without errors", () => {
    render(<ColorList colors={[]} />)
});

test("Renders a list of colors without errors", () => {
    render(<ColorList colors={testColorList} />)
});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", () => {
    const toggleEdit = jest.fn()
    render(<ColorList colors={testColorList} />);
    let editing = screen.queryByTestId("color");
    userEvent.click(editing);
    expect(toggleEdit).toBeCalled();
});
