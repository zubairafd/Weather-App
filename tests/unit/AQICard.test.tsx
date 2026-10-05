import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AQICard } from '@/components/weather/AQICard'
import { AirQualityData } from '@/types'

const mockAQI: AirQualityData = {
  usAqi: 35,
  europeanAqi: 20,
  pm25: 8.5,
  pm10: 15.0,
  o3: 25.0,
  no2: 10.0,
  so2: 2.0,
  co: 150.0,
  category: 'Good',
  healthRiskText: 'Low Health Risk',
  healthAdvice: 'Air quality is satisfactory.',
}

describe('AQICard component', () => {
  it('renders AQI score and risk badge', () => {
    render(<AQICard data={mockAQI} />)
    expect(screen.getByText('35')).toBeTruthy()
    expect(screen.getByText('Low Health Risk')).toBeTruthy()
  })
})
