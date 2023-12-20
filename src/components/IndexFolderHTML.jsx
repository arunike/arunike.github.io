import React from 'react';
import { useParams } from 'react-router-dom';

function IndexHTML() {
    const { projectDirectory1, projectDirectory2, projectName } = useParams();

    return (
        <iframe 
        src={`/${projectDirectory1}/${projectDirectory2}/${projectName}/index.html`} 
        title={`${projectName} HTML Content`}
        style={{ width: '100%', height: '100vh', border: 'none' }}
        ></iframe>
    );
}

export default IndexHTML;