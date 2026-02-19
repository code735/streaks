import Progress from "./progress";

type ProgressPageProps = {
  searchParams?: {
    year?: string;
  };
};

export default function ProgressPage({ searchParams }: ProgressPageProps) {
  return <Progress yearParam={searchParams?.year} />;
}
