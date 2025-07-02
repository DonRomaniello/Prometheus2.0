import { Helmet } from 'react-helmet';
import ContentRenderer from '../components/ContentRenderer';

const SolidFoundations = () => {
  return (
    <>
      <Helmet>
        <title>Prometheus Studios: Solid Foundations</title>
        <meta name="description" content="Solid Foundations is a smooth introduction to the fundamental units of improvisation." />
        <meta name="keywords" content="improv, intro, level one, level 1, solid foundations, course, hudson valley, adult education, arts education" />
        <meta property="og:title" content="Prometheus Studios: Solid Foundations" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.prometheusstudios.org/solid_foundations" />
        <meta property="og:image" content="http://www.prometheusstudios.org/img/classes/solid_foundations.png" />
        <meta property="og:description" content="World class improv in the Hudson Valley." />
      </Helmet>
      <ContentRenderer contentFile="solid_foundations" />
    </>
  );
};

export default SolidFoundations;
