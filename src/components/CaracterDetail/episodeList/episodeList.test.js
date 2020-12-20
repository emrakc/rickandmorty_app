import TestRenderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import EpisodesGrid, { GET_FIRST_FIVE_LOCATIONS } from './episodeList';
import {  act } from '@testing-library/react'

describe("render correctly", () => {
    it("should resolve loading and data", async () => {
        const characterMocks = {
            request: {
                query: GET_FIRST_FIVE_LOCATIONS,
                variables: {
                    ids: [1, 2, 3, 4, 5]
                },
            },
            result: {
                data: {
                    episodesByIds: [
                        { id: 1, name: 'episode1', air_date: '12.02.2020', episode: 'e1' },
                        { id: 2, name: 'episode2', air_date: '12.02.2020', episode: 'e2' },
                        { id: 3, name: 'episode3', air_date: '12.02.2020', episode: 'e3' },
                        { id: 4, name: 'episode4', air_date: '12.02.2020', episode: 'e4' },
                        { id: 5, name: 'episode5', air_date: '12.02.2020', episode: 'e5' },

                    ],
                }
            },
        };
        const component = TestRenderer.create(
            <MockedProvider mocks={[characterMocks]} addTypename={false}>
                <EpisodesGrid list={[1, 2, 3, 4, 5]} />
            </MockedProvider>
        );  
        const tree = component.toJSON();
        expect(tree.children.toString()).toContain('Loading...'); 
        expect(tree).toMatchSnapshot(); 

        await act(() => new Promise((resolve) => setTimeout(resolve, 0)));  
        const gridRowContainer = component.root.findByType('tbody'); 
        expect(gridRowContainer.children.length).toBe(5);   
    });
});


