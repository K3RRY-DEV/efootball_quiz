

const ResultScreen = ({score, totalQuestions}) => {

    const getRemark = () => {
    const percent = (score / totalQuestions) * 100;
    if (percent >= 80) return "Excellent!";
    if (percent >= 50) return "Good job!";
    return "Try again!";
  };

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
      <p className="text-lg">Your Score: <strong>{score} / {totalQuestions}</strong></p>
      <p className="mt-2">{getRemark()}</p>
    </div>
  );
}

export default ResultScreen