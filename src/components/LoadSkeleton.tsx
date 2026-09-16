import "./LoadSkeleton.css";

export const LoadSkeleton = () => {
  return (
    <div className="skeleton" data-testid="loading-skeleton">
      <div className="circle" />
      <div className="line" />
      <div className="line" />
      <div className="rect" />
    </div>
  );
};
