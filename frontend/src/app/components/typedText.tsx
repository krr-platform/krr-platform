// // components/TypedText.js
// import Typed from 'typed.js';
// import { useEffect, useRef } from 'react';

// const TypedText = () => {
//     const el = useRef(null);

//     useEffect(() => {
//         const options = {
//             strings: [
//                 'Here you can add your strings',
//                 'Another string example'
//             ],
//             typeSpeed: 50,
//             backSpeed: 50,
//             loop: true
//         };

//         const typed = new Typed(el.current, options);

//         return () => {
//             // Destroy Typed instance during cleanup to stop animation
//             typed.destroy();
//         };
//     }, []);

//     return <span ref={el} />;
// };

// export default TypedText;
