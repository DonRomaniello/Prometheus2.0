import { useParams, useNavigate } from 'react-router-dom';
import { ContentRenderer } from '../components';

const TheStudio = () => {
  const { personSlug } = useParams();
  const navigate = useNavigate();

  const handlePersonExpand = (slug) => {
    // Update URL when person is expanded/collapsed
    if (slug) {
      navigate(`/the_studio/${slug}`, { replace: true });
    } else {
      navigate('/the_studio', { replace: true });
    }
  };

  return (
    <ContentRenderer 
      contentFile="the_studio" 
      initialExpandedSlug={personSlug}
      onPersonExpand={handlePersonExpand}
    />
  );
};

export default TheStudio;
