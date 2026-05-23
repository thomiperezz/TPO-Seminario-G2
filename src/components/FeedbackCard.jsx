import '../assets/styles/global.css';

/**
 * Componente FeedbackCard
 * Renderiza una tarjeta de retroalimentación de la IA con categoría, contenido y acciones
 *
 * Props:
 *   - id: identificador único del feedback
 *   - category: tipo de categoría ('generic', 'complexity', 'error')
 *   - title: título de la categoría
 *   - text: contenido del feedback
 *   - onUseful: callback cuando se marca como útil
 *   - onDismiss: callback cuando se descarta
 */
const FeedbackCard = ({
  id,
  category,
  title,
  text,
  onUseful,
  onDismiss
}) => {
  return (
    <div className="feedback-card">
      <div className="feedback-header">
        <span className={`feedback-category ${category}`}>
          {title}
        </span>
      </div>

      <div className="feedback-content">
        <p className="feedback-text">{text}</p>
      </div>

      <div className="feedback-actions">
        <button
          className="feedback-btn useful"
          onClick={() => onUseful(id)}
          title="Marcar como útil"
        >
          ✓ Útil
        </button>
        <button
          className="feedback-btn dismiss"
          onClick={() => onDismiss(id)}
          title="Descartar"
        >
          ✕ Descartar
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
