import React from 'react';
import MutationObserver from 'mutationobserver-shim';
import {fetchColorService as mockFetch} from '../services/fetchColorService'
import { render, screen, waitFor} from "@testing-library/react";
import BubblePage from './BubblePage';

jest.mock("../services/fetchColorService")

const Colors = {
    data: [
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
        {
            color: 'lilac',
            code: {
                hex: '#9a99dd',
            },
            id: 4,
        },
        {
            color: 'softpink',
            code: { 
                hex: '#dd99ba',
            },
            id: 5,
        },
    ]
}

test("Renders without errors", async ()=> {
    mockFetch.mockResolvedValueOnce([])
    render(<BubblePage/>)
    await waitFor(() => {
        const Colors = screen.getByText(/colors/i)
        const bubbles = screen.getByText(/bubbles/i)
        expect(Colors).toHaveTextContent('colors')
        expect(bubbles).toHaveTextContent('Bubbles')
    })
    
});

test("Renders appropriate number of colors passed in through mock", async ()=> {
    //Keep in mind that our service is called on mount for this component.
    mockFetch.mockResolvedValueOnce(Colors);
    render(<BubblePage />);
    await waitFor(() => []);
    const list = screen.getAllByTestId('color');
    const limegreen = screen.getByText(/limegreen/i);
    expect(list).toHaveLength(5);
    expect(limegreen).toBeInTheDocument();
});