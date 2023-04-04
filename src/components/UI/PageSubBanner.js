import styles from "./PageSubBanner.module.css";

const PageSubBanner = (props) => {
  const classes = styles.banner + props.className;
  return (
    <div className={`${styles.subbanner} ${props.className} `}>{props.children}</div>
  );
};

export default PageSubBanner;