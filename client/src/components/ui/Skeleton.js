const Skeleton = ({ className = "", variant = "rectangle", width, height, count = 1, ...props }) => {
    const baseClasses = "animate-pulse bg-muted rounded"
  
    const getVariantClasses = () => {
      switch (variant) {
        case "circle":
          return "rounded-full"
        case "text":
          return "h-4 rounded-md"
        case "rectangle":
        default:
          return "rounded-md"
      }
    }
  
    const style = {
      width: width,
      height: height,
    }
  
    const renderSkeleton = () => {
      return Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className={`${baseClasses} ${getVariantClasses()} ${className}`} style={style} {...props} />
        ))
    }
  
    return <>{renderSkeleton()}</>
  }
  
  export default Skeleton
  
  