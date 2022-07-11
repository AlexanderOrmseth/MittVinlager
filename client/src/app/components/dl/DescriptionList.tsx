import {motion} from "framer-motion";

interface Props {
  title?: string;
  children: React.ReactNode;
  titleElement?: React.ReactNode;
  delay?: number;
}

const DescriptionList = ({title, children, titleElement, delay = 0}: Props) => {
  return (
    <motion.dl
      initial={{x: -10, opacity: 0}}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{type: "spring", stiffness: 120, delay: 0.1 * delay}}
      className="overflow-hidden"
    >
      {titleElement ? (
        titleElement
      ) : (
        <div className="font-medium rounded-t-lg text pl-4 text-sm  text-gray-900 py-2">
          {title}
        </div>
      )}
      {children}
    </motion.dl>
  );
};

export default DescriptionList;
