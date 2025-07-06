import {
  Public as ContinentIcon,
  AttachMoney as CurrencyIcon,
  Language as LanguageIcon
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Fade,
  LinearProgress,
  Typography
} from '@mui/material';
import React from 'react';
import { BORDER_COLORS } from '../../utils/colorUtils';
import { BORDER, BORDER_RADIUS, SPACING } from '../../utils/styleUtils';
import { FONT_WEIGHTS } from '../../utils/typographyUtils';
import { ExpandableChips } from './ExpandableChips';

interface ContinentStat {
  continent: {
    code: string;
    name: string;
  };
  countryCount: number;
  uniqueLanguages: number;
  uniqueCurrencies: number;
  languages: string[];
  currencies: string[];
}

interface ContinentCardProps {
  stat: ContinentStat;
  index: number;
  maxCountries: number;
  maxLanguages: number;
  maxCurrencies: number;
  expandedLanguages: Record<string, boolean>;
  expandedCurrencies: Record<string, boolean>;
  onToggleLanguagesExpanded: (continentCode: string) => void;
  onToggleCurrenciesExpanded: (continentCode: string) => void;
}

export const ContinentCard: React.FC<ContinentCardProps> = ({
  stat,
  index,
  maxCountries,
  maxLanguages,
  maxCurrencies,
  expandedLanguages,
  expandedCurrencies,
  onToggleLanguagesExpanded,
  onToggleCurrenciesExpanded
}) => {
  return (
    <Fade in timeout={800 + index * 200}>
      <Card sx={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(10px)',
        border: BORDER.SOLID_1,
        borderColor: BORDER_COLORS.DIVIDER,
        borderRadius: BORDER_RADIUS.LARGE,
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px) scale(1.02)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
          '& .continent-header': {
            background: 'linear-gradient(135deg, rgba(25,118,210,0.1) 0%, rgba(156,39,176,0.1) 100%)',
          }
        }
      }}>
        {/* Animated background pattern */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at ${20 + index * 20}% ${30 + index * 15}%, rgba(25,118,210,0.03) 0%, transparent 50%)`,
          pointerEvents: 'none'
        }} />

        <CardContent sx={{ p: SPACING.MD, position: 'relative', zIndex: 1 }}>
          <Box className="continent-header" sx={{
            display: 'flex',
            alignItems: 'center',
            mb: SPACING.MD,
            p: SPACING.SM,
            borderRadius: BORDER_RADIUS.MEDIUM,
            transition: 'all 0.3s ease',
            background: 'linear-gradient(135deg, rgba(25,118,210,0.05) 0%, rgba(156,39,176,0.05) 100%)'
          }}>
            <ContinentIcon sx={{
              color: 'primary.main',
              mr: 1,
              fontSize: 20,
              filter: 'drop-shadow(0 1px 2px rgba(25,118,210,0.3))'
            }} />
            <Typography variant="subtitle1" sx={{
              fontWeight: FONT_WEIGHTS.BOLD,
              background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {stat.continent.name}
            </Typography>
          </Box>

          <Box sx={{ mb: SPACING.MD }}>
            <Typography variant="h4" sx={{
              fontWeight: FONT_WEIGHTS.BOLD,
              color: 'primary.main',
              mb: 0.5,
              textAlign: 'center',
              textShadow: '0 1px 2px rgba(25,118,210,0.2)'
            }}>
              {stat.countryCount}
            </Typography>
            <Typography variant="body2" sx={{
              color: 'text.secondary',
              textAlign: 'center',
              fontWeight: FONT_WEIGHTS.MEDIUM,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              mb: 1
            }}>
              Countries
            </Typography>

            {/* Progress bar for countries */}
            <Box sx={{ mb: 1 }}>
              <LinearProgress
                variant="determinate"
                value={(stat.countryCount / maxCountries) * 100}
                sx={{
                  height: 6,
                  borderRadius: BORDER_RADIUS.SMALL,
                  background: 'rgba(25,118,210,0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                    borderRadius: BORDER_RADIUS.SMALL
                  }
                }}
              />
              <Typography variant="caption" sx={{
                color: 'text.secondary',
                mt: 0.25,
                display: 'block',
                textAlign: 'center',
                fontSize: '0.7rem'
              }}>
                {((stat.countryCount / maxCountries) * 100).toFixed(0)}% of max
              </Typography>
            </Box>
          </Box>

          <Divider sx={{
            my: SPACING.MD,
            background: 'linear-gradient(90deg, transparent 0%, rgba(25,118,210,0.2) 50%, transparent 100%)',
            height: 1
          }} />

          <Box sx={{ mb: SPACING.MD }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LanguageIcon sx={{ color: 'secondary.main', mr: 0.5, fontSize: 16 }} />
              <Typography variant="body2" sx={{
                fontWeight: FONT_WEIGHTS.BOLD,
                color: 'text.primary',
                fontSize: '0.8rem'
              }}>
                Languages: {stat.uniqueLanguages}
              </Typography>
            </Box>

            {/* Progress bar for languages */}
            <Box sx={{ mb: 1 }}>
              <LinearProgress
                variant="determinate"
                value={(stat.uniqueLanguages / maxLanguages) * 100}
                sx={{
                  height: 4,
                  borderRadius: BORDER_RADIUS.SMALL,
                  background: 'rgba(156,39,176,0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #9c27b0 0%, #ba68c8 100%)',
                    borderRadius: BORDER_RADIUS.SMALL
                  }
                }}
              />
              <Typography variant="caption" sx={{
                color: 'text.secondary',
                mt: 0.25,
                display: 'block',
                textAlign: 'center',
                fontSize: '0.7rem'
              }}>
                {((stat.uniqueLanguages / maxLanguages) * 100).toFixed(0)}% of max
              </Typography>
            </Box>

            <ExpandableChips
              items={stat.languages}
              isExpanded={expandedLanguages[stat.continent.code] || false}
              onToggleExpanded={() => onToggleLanguagesExpanded(stat.continent.code)}
              color="secondary"
              maxVisible={3}
            />
          </Box>

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CurrencyIcon sx={{ color: 'warning.main', mr: 0.5, fontSize: 16 }} />
              <Typography variant="body2" sx={{
                fontWeight: FONT_WEIGHTS.BOLD,
                color: 'text.primary',
                fontSize: '0.8rem'
              }}>
                Currencies: {stat.uniqueCurrencies}
              </Typography>
            </Box>

            {/* Progress bar for currencies */}
            <Box sx={{ mb: 1 }}>
              <LinearProgress
                variant="determinate"
                value={(stat.uniqueCurrencies / maxCurrencies) * 100}
                sx={{
                  height: 4,
                  borderRadius: BORDER_RADIUS.SMALL,
                  background: 'rgba(255,152,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #ff9800 0%, #ffb74d 100%)',
                    borderRadius: BORDER_RADIUS.SMALL
                  }
                }}
              />
              <Typography variant="caption" sx={{
                color: 'text.secondary',
                mt: 0.25,
                display: 'block',
                textAlign: 'center',
                fontSize: '0.7rem'
              }}>
                {((stat.uniqueCurrencies / maxCurrencies) * 100).toFixed(0)}% of max
              </Typography>
            </Box>

            <ExpandableChips
              items={stat.currencies}
              isExpanded={expandedCurrencies[stat.continent.code] || false}
              onToggleExpanded={() => onToggleCurrenciesExpanded(stat.continent.code)}
              color="warning"
              maxVisible={3}
            />
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
}; 