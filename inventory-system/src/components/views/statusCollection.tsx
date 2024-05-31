import { Tag, Badge, BadgeProps } from "antd";
const getTypeBadge = (type: number) => {
  let text = "";
  let status: BadgeProps["status"] = "default";
  switch (type) {
    case 0:
      text = "Sale";
      status = "success";
      break;
    case 1:
      text = "Purchase";
      status = "processing";
      break;
    default:
      text = "Unknown";
      status = "default";
  }
  return <Badge status={status} text={text} />;
};

const getStatusTag = (status: number) => {
  console.log("Status received:", status, typeof status);
  let color = "";
  let text = "";
  switch (status) {
    case 0:
      color = "orange";
      text = "Pending";
      break;
    case 1:
      color = "green";
      text = "Completed";
      break;
    case 2:
      color = "red";
      text = "Cancelled";
      break;
    case 3:
      color = "yellow";
      text = "Received";
      break;
    default:
      color = "blue";
      text = "Unknown";
  }
  return <Tag color={color}>{text}</Tag>;
};

export { getStatusTag, getTypeBadge };
