import React, { Suspense } from 'react';
import Preloader from '../common/Preloader/Preloader';

const withAuthRedirect = Component => (props) => {
    return <Suspense fallback={<Preloader />}>
        <Component {...props} />
    </Suspense>
}

export default withAuthRedirect