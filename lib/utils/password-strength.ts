export interface PasswordStrength {
  score: number; // 0 to 4
  label: string;
  color: string;
  barColor: string;
  hasLength: boolean;
  hasLetters: boolean;
  hasNumbers: boolean;
  hasSpecial: boolean;
}

export function evaluatePasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return {
      score: 0,
      label: "فارغة",
      color: "text-zinc-500",
      barColor: "bg-zinc-700",
      hasLength: false,
      hasLetters: false,
      hasNumbers: false,
      hasSpecial: false,
    };
  }

  const hasLength = password.length >= 8;
  const hasLetters = /[A-Za-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  let score = 0;
  if (hasLength) score++;
  if (hasLetters) score++;
  if (hasNumbers) score++;
  if (hasSpecial) score++;

  let label = "ضعيفة جدًا";
  let color = "text-red-400";
  let barColor = "bg-red-500";

  switch (score) {
    case 1:
      label = "ضعيفة";
      color = "text-red-400";
      barColor = "bg-red-500";
      break;
    case 2:
      label = "مقبولة";
      color = "text-amber-400";
      barColor = "bg-amber-500";
      break;
    case 3:
      label = "جيدة";
      color = "text-blue-400";
      barColor = "bg-blue-500";
      break;
    case 4:
      label = "قوية جدًا";
      color = "text-emerald-400";
      barColor = "bg-emerald-500";
      break;
    default:
      label = "ضعيفة جدًا";
      color = "text-red-400";
      barColor = "bg-red-500";
  }

  return {
    score,
    label,
    color,
    barColor,
    hasLength,
    hasLetters,
    hasNumbers,
    hasSpecial,
  };
}

