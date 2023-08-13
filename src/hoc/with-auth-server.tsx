export function withAuthServer(gssp:any) {
    return async (context:any) => {
        // const response = await fetch('http://localhost:4000/user/me');
        // const data = await response.json();
        console.log(gssp.req);
        const data = true;

        if (!data) {
            return {
                redirect: {
                    destination: '/admin/login'
                }
            };
        }

        const gsspData = await gssp(context); // Run `getServerSideProps` to get page-specific data

        // Pass page-specific props along with user data from `withAuth` to component
        console.log(gsspData.props);
        return {
            props: {
                ...gsspData.props,
                data:{
                }
            }
        };
    }
}
