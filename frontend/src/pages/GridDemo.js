import React from 'react';
import ContentRenderer from '../components/ContentRenderer';

const GridDemo = () => {
  return (
    <div className="layout-two-column">
      <main className="area-main">
        <ContentRenderer contentFile="grid-demo" />
        
        {/* Demo of three equal columns */}
        <div className="layout-three-equal mt-xl">
          <div className="area-left p-md bg-secondary">
            <h3>Feature 1</h3>
            <p>Semantic grid areas make layouts intuitive</p>
          </div>
          <div className="area-center p-md bg-secondary">
            <h3>Feature 2</h3>
            <p>Responsive by default - stacks on mobile</p>
          </div>
          <div className="area-right p-md bg-secondary">
            <h3>Feature 3</h3>
            <p>Easy to customize and maintain</p>
          </div>
        </div>

        {/* Demo of auto-fit grid */}
        <div className="grid-auto-fit mt-xl">
          <div className="p-md bg-secondary">
            <h4>Auto Card 1</h4>
            <p>These cards automatically fit the available space</p>
          </div>
          <div className="p-md bg-secondary">
            <h4>Auto Card 2</h4>
            <p>Minimum width maintained, but grows as needed</p>
          </div>
          <div className="p-md bg-secondary">
            <h4>Auto Card 3</h4>
            <p>Perfect for responsive card layouts</p>
          </div>
          <div className="p-md bg-secondary">
            <h4>Auto Card 4</h4>
            <p>Add more cards and they flow naturally</p>
          </div>
        </div>
      </main>
      
      <aside className="area-sidebar p-lg bg-light">
        <h3>Grid Navigation</h3>
        <ul>
          <li>Two Column Layout</li>
          <li>Three Equal Columns</li>
          <li>Auto-Responsive Cards</li>
          <li>Full Page Layouts</li>
        </ul>
        
        <h4 className="mt-lg">Layout Classes</h4>
        <ul className="text-sm">
          <li><code>.layout-two-column</code></li>
          <li><code>.layout-three-equal</code></li>
          <li><code>.layout-content-sidebar</code></li>
          <li><code>.grid-auto-fit</code></li>
          <li><code>.grid-auto-fill</code></li>
        </ul>
      </aside>
    </div>
  );
};

export default GridDemo;
