import { Helmet } from 'react-helmet';
import ContentRenderer from '../components/ContentRenderer';

const SolidFoundations = () => {
  return (
    <>
      <Helmet>
        <title>Prometheus Studios: Solid Foundations</title>
        <meta name="description" content="Solid Foundations is a smooth introduction to the fundamental units of improvisation." key="description"/>
        <meta name="keywords" content="improv, intro, level one, level 1, solid foundations, course, hudson valley, adult education, arts education" key="keywords"/>
        <meta property="og:title" content="Prometheus Studios: Solid Foundations" key="og:title"/>
        <meta property="og:type" content="website" key="og:type"/>
        <meta property="og:url" content="https://prometheusstudios.org/solid_foundations" key="og:url"/>
        <link rel="apple-touch-icon" href="https://prometheusstudios.org/img/classes/solid_foundations.png" key="apple-touch-icon"/>
        <meta property="og:image" content="https://prometheusstudios.org/img/classes/solid_foundations.png" key="og:image"/>
        <meta property="og:description" content="World class improv in the Hudson Valley." key="og:description"/>
      </Helmet>
      <ContentRenderer contentFile="solid_foundations" />
    </>
  );
};

export default SolidFoundations;
