import ContentRenderer from '../components/ContentRenderer';

const Privacy = () => {
  const content = `# Privacy Policy

## Your Privacy Matters

At Prometheus Studios, we are committed to protecting your privacy and ensuring the security of your personal information.

### Information We Collect

- Personal information you provide when contacting us
- Usage data to improve our services
- Communication preferences

### How We Use Your Information

- To respond to your inquiries
- To improve our services and website
- To send updates about classes and events (with your consent)

### Data Protection

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

### Contact Us

If you have any questions about our privacy policy, please contact us.

*This is a placeholder page. Detailed privacy policy content will be added later.*`;

  return (
    <div className="container">
      <ContentRenderer content={content} />
    </div>
  );
};

export default Privacy;
