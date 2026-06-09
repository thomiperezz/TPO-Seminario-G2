import '../../assets/styles/global.css';

const SectionHeader = ({ children }) => {
  return (
    <h2 className="card-title">
      {children}
    </h2>
  );
};

export default SectionHeader;