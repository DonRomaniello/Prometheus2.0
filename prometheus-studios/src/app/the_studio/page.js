'use client';

import { useRouter } from 'next/navigation';
import { ContentRenderer } from '../../components';

export default function TheStudio() {
  const router = useRouter();

  const handlePersonExpand = (slug) => {
    // Update URL when person is expanded/collapsed
    if (slug) {
      router.push(`/the_studio/${slug}`, { replace: true });
    } else {
      router.push('/the_studio', { replace: true });
    }
  };

  return (
    <ContentRenderer 
      contentFile="the_studio" 
      initialExpandedSlug={null}
      onPersonExpand={handlePersonExpand}
    />
  );
}