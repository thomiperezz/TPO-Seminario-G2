import TarjetaAlerta from '../ui/CardAlert';
import SectionHeader from '../ui/SectionHeader';

const DetectedPatterns = () => {
  return (
    <>
      <SectionHeader>
        Patrones detectados
      </SectionHeader>

      <TarjetaAlerta
        tipo="rojo"
        titulo="Código sin comentarios ni justificación"
        descripcion="Presente en 11 de 22 trabajos revisados."
      />

      <TarjetaAlerta
        tipo="amarillo"
        titulo="Soluciones idénticas entre alumnos"
        descripcion="4 trabajos comparten la misma lógica de resolución."
      />

      <TarjetaAlerta
        tipo="azul"
        titulo="Oportunidad de clase"
        descripcion="Las estructuras de control siguen siendo el mayor punto de confusión."
      />
    </>
  );
};

export default DetectedPatterns;