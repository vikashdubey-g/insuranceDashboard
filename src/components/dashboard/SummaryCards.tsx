import {
  acceptedIcon,
  coiProcessedIcon,
  expiryIcon,
  rejectedIcon,
} from "../../assets";

interface SummaryCardsProps {
  total: number;
  accepted: number;
  rejected: number;
  expiring: number;
}

const cards = [
  {
    title: "Total COI Processed",
    valueKey: "total",
    icon: coiProcessedIcon,
    bg: "bg-[#EDF4FF]",
    innerBg: "bg-[#FFFFFF]",
  },
  {
    title: "Accepted",
    valueKey: "accepted",
    icon: acceptedIcon,
    bg: "bg-[#E9FAF6]",
    innerBg: "bg-[#FFFFFF]",
  },
  {
    title: "Rejected",
    valueKey: "rejected",
    icon: rejectedIcon,
    bg: "bg-[#FDF4F7]",
    innerBg: "bg-[#FFFFFF]",
  },
  {
    title: "Expiring in 30 days",
    valueKey: "expiring",
    icon: expiryIcon,
    bg: "bg-[#FEEEEA]",
    innerBg: "bg-[#FFFFFF]",
  },
];

export const SummaryCards = ({
  total,
  accepted,
  rejected,
  expiring,
}: SummaryCardsProps) => {
  const values = { total, accepted, rejected, expiring };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.bg} rounded-xl p-5 flex flex-col gap-4 shadow-xs`}
        >
          <h3 className="text-md font-medium text-gray-700">{card.title}</h3>

          <div
            className={`${card.innerBg} rounded-lg px-4 py-3 flex items-center gap-3`}
          >
            <img src={card.icon} alt={card.title} className="h-6 w-6" />
            <span className="text-2xl font-semibold text-gray-900">
              {values[card.valueKey as keyof typeof values]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
