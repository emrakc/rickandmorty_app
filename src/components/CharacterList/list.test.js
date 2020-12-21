// import TestRenderer from 'react-test-renderer';
// import { MockedProvider } from '@apollo/client/testing';
// import CharacterListMenu, { GET_CHRC_QUERY } from './list';
// import MenuItem from './item';
// import MenuContextProvider from '../../Context/MenuContext'
// import { render, wait, fireEvent, act } from '@testing-library/react'

// const mocks = [
//     {
//         request: {
//             query: GET_CHRC_QUERY,
//             variables: {
//                 page: 1
//             },
//         },
//     },
// ];

// it('renders without error', () => {
//     const component = TestRenderer.create(
//         <MenuContextProvider value={{ selectedCharacterId: null }}>
//             <MockedProvider mocks={mocks} addTypename={false}>
//                 <CharacterListMenu />
//             </MockedProvider>
//         </MenuContextProvider>
//     );
//     const tree = component.toJSON();
//     expect(tree.children).toContain('Loading...');
// });

// it('should render menu items', async () => {
   
//     const characterMocks = {
//         request: {
//             query: GET_CHRC_QUERY,
//             variables: {
//                 page: 1
//             },
//         },
//         result: {
//             data: {
//                 characters: {
//                     results: [
//                         { id: 1, status: 'alive', name: 'a1', image: '#' },
//                         { id: 2, status: 'alive', name: 'a1', image: '#' },
//                         { id: 3, status: 'alive', name: 'a1', image: '#' },
//                         { id: 4, status: 'alive', name: 'a1', image: '#' },
//                         { id: 5, status: 'alive', name: 'a1', image: '#' },
//                         { id: 6, status: 'alive', name: 'a1', image: '#' },
//                         { id: 7, status: 'alive', name: 'a1', image: '#' },
//                         { id: 8, status: 'alive', name: 'a1', image: '#' },
//                         { id: 9, status: 'alive', name: 'a1', image: '#' },
//                         { id: 10, status: 'alive', name: 'a1', image: '#' },
//                         { id: 11, status: 'alive', name: 'a1', image: '#' },
//                         { id: 12, status: 'alive', name: 'a1', image: '#' },
//                         { id: 13, status: 'alive', name: 'a1', image: '#' },
//                         { id: 14, status: 'alive', name: 'a1', image: '#' },
//                         { id: 15, status: 'alive', name: 'a1', image: '#' },
//                         { id: 16, status: 'alive', name: 'a1', image: '#' },
//                         { id: 17, status: 'alive', name: 'a1', image: '#' },
//                         { id: 18, status: 'alive', name: 'a1', image: '#' },
//                         { id: 19, status: 'alive', name: 'a1', image: '#' },
//                         { id: 20, status: 'alive', name: 'a1', image: '#' },
//                     ],
//                     info: {
//                         count: 600,
//                         pages: 34,
//                         next: 3,
//                         prev: null,
//                     }
//                 }
//             }
//         },
//     };
//     const  component =TestRenderer.create(
//         <MenuContextProvider value={{ selectedCharacterId: null }}>
//             <MockedProvider mocks={[characterMocks]} addTypename={false}> 
//                       <CharacterListMenu /> 
//             </MockedProvider>
//         </MenuContextProvider>
//     );

//     await act(() => new Promise((resolve) => setTimeout(resolve, 0)));   
//     const list = component.root.findAllByProps('data-id');  
//     console.log(list) 
//     expect(list.length).toBe(20);
// });


