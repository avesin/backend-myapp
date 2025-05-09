import { calculateZodiac } from "./calculate-zodiac";

export function calculateHoroscope(dateOfBirth: Date | string): string {
    const zodiac = calculateZodiac(dateOfBirth);
    // Simple example horoscope per zodiac:
    const horoscopes = {
        Aries: 'Your courage will guide you today.',
        Taurus: 'Be patient and rewards will come.',
        Gemini: 'New connections bring opportunities.',
        Cancer: 'Focus on family and emotional balance.',
        Leo: 'Your leadership will shine.',
        Virgo: 'Attention to detail leads to success.',
        Libra: 'Seek harmony in your decisions.',
        Scorpio: 'Your passion will open doors.',
        Sagittarius: 'Adventure awaits.',
        Capricorn: 'Hard work pays off.',
        Aquarius: 'Innovation is your strength.',
        Pisces: 'Your intuition is powerful today.'
    };

    return horoscopes[zodiac] || 'Today is full of surprises!';
}
