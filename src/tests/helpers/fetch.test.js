import { fetchNoToken, fetchWithToken } from "../../helpers/fetch";



describe('This test will check our helper fetch functions', () => {

    let token = '';
    
    test('should FetchNoToken work', async () => {
        
        const response = await fetchNoToken('auth', {email: 'gerry@outlook.com', password: '123456'}, 'POST');

        expect( response instanceof Response ).toBe(true);

        const body = await response.json();
        expect( body.ok ).toBe(true);

        token = body.token;
    });

    test('should FetchWithToken work', async () => {
        
        localStorage.setItem('token', token);
        
        const response = await fetchWithToken('events/61c806d70e1b393dd3b33212', {}, 'DELETE');
        const body = await response.json();

        expect( body.message).toBe('Event not found by that ID');

    });
});
