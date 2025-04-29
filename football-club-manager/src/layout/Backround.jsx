import bgImage from '../assets/background5.jpg';

function Background() {
    const style = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
      };

  return <div style={style}></div>;
}

export default Background;
