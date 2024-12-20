import {
  Users,
  ShoppingCart,
  Package,
  TrendingUp,
  Mail,
  Star,
} from "lucide-react";

export  const statsData = [
  {
    title: "Total Users",
    value: "12,345",
    icon: Users,
    trend: "+12.5%",
  },
  {
    title: "Total Orders",
    value: "1,234",
    icon: ShoppingCart,
    trend: "+8.2%",
  },
  {
    title: "Products",
    value: "456",
    icon: Package,
    trend: "-2.4%",
  },
  {
    title: "Revenue",
    value: "$45,678",
    icon: TrendingUp,
    trend: "+15.3%",
  },
  {
    title: "New Subscribers",
    value: "789",
    icon: Mail,
    trend: "+10.4%",
  },
  {
    title: "Feedbacks Received",
    value: "321",
    icon: Star,
    trend: "-1.8%",
  },
];
