  import react from 'react-dom';
  import CharacterListMenu from './components/CharacterList';
  import renderer from 'react-test-renderer'

  test('snapshot for character list',()=>{
    const component =renderer.create(<CharacterListMenu />)
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })