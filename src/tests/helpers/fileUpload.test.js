import cloudinary from 'cloudinary';
import '@testing-library/jest-dom';
//import fetch from 'isomorphic-fetch';
cloudinary.config({
  cloud_name: 'dvluv58d2',
  api_key: '858941665533637',
  api_secret: '7rt-FVVXQJ6EMje4-HXuCJeJ8e8',
});
import { fileUpload } from '../../helpers/fileUpload';
describe('Pruebas para el uploadImage', () => {
  test('debe cargar un archivo y retornar URL', async (done) => {
    const resp = await fetch(
      'data:image/png;base64,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'
    );
    const blob = await resp.blob();

    const file = new File([blob], 'foto.png');

    const url = await fileUpload(file);
    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imgId = segments[segments.length - 1].replace('.png', '');
    console.log(imgId);
    cloudinary.v2.api.delete_resources(imgId, {}, () => {
      done();
    });
  });

  test('debe cargar un archivo y retornar URL', async () => {
    const file = new File([], 'foto.png');

    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
