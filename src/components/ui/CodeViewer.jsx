import '../../assets/styles/global.css';

/**
 * Componente CodeViewer
 * Visualiza código con colores sintácticos y explicación
 *
 * Props:
 *   - header: texto del encabezado (ej: "TP — Algoritmos...")
 *   - children: elementos JSX para renderizar el código
 *   - explanationTitle: título de la explicación
 *   - explanationText: texto de la explicación
 *   - explanationLinks: array de links opcionales
 */
const CodeViewer = ({
  header,
  children,
  explanationTitle,
  explanationText,
  explanationLinks = []
}) => {
  return (
    <div className="code-panel">
      {/* Encabezado del código */}
      <div className="code-header">{header}</div>

      {/* Visualizador de código */}
      <div className="code-container">
        <pre className="code-content">{children}</pre>
      </div>

      {/* Explicación general */}
      <div className="code-explanation">
        <p className="explanation-title">{explanationTitle}</p>
        <p className="explanation-text">{explanationText}</p>
        {explanationLinks.map((link, index) => (
          <p key={index} className="explanation-text">
            <a
              href="#"
              className="explanation-link"
              onClick={(e) => {
                e.preventDefault();
                link.onClick && link.onClick();
              }}
            >
              {link.text}
            </a>
            {link.suffix && <span> {link.suffix}</span>}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CodeViewer;
