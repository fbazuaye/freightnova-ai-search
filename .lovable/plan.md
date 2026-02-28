

## Fix: Search Not Finding Most Container and B/L Numbers

### Root Cause
The tab auto-routing in `Dashboard.tsx` (lines 18-26) only recognizes a few hardcoded prefixes (`msku`, `tclu`) to switch tabs. Any other container or B/L prefix (CMAU, HLBU, OOLU, MAEU, EISU, YMLU, ZIMU, ONEU, CSLU, SEGU, MSCU, HLXU, TRHU, PCIU, WANU, KMTU, HDMU, KKFU) doesn't match, so the app stays on the wrong tab and shows "no results."

### Solution
Implement smart auto-detection that searches across all mock datasets to determine the correct tab, rather than relying on keyword/prefix matching.

### Changes

**1. Create `src/lib/tabDetection.ts`** -- Smart tab detection utility
- Import all mock data arrays (or their IDs) from the result components
- When a search query is entered, check if the extracted search terms match any entry in each dataset
- Return the tab that has matching results, falling back to keyword-based detection
- Priority order: Tracking > Bills of Lading > Bookings > Cargo Space

**2. Update `Dashboard.tsx`** -- Use smart detection
- Replace the hardcoded prefix matching in `handleSearch` with the new detection utility
- The logic will:
  1. First try to find which dataset contains a match for the search terms
  2. If a match is found in tracking data, switch to tracking tab
  3. If a match is found in B/L data, switch to bills-lading tab
  4. If a match is found in bookings, switch to bookings tab
  5. Fall back to keyword-based detection (e.g., "track" -> tracking tab) if no direct match

**3. Export mock data arrays** from each results component
- Move mock data arrays to a shared location (or export them) so the tab detection utility can search across them without duplicating data

### Technical Details

The detection function will:
```text
extractSearchTerms("CMAU4455881")
  -> ["cmau4455881"]
  -> check tracking mock IDs -> found "CMAU4455881" -> return "tracking"

extractSearchTerms("HLBU7700123") 
  -> ["hlbu7700123"]
  -> check tracking mock IDs -> not found
  -> check B/L mock IDs -> found "HLBU7700123" -> return "bills-lading"
```

An alternative simpler approach: detect any alphanumeric string that looks like a container/B/L pattern (4 letters + 7 digits) and search all tabs. This avoids needing to hardcode prefixes.

### File Changes Summary
1. **New file**: `src/lib/tabDetection.ts` - smart tab routing logic
2. **New file**: `src/data/mockData.ts` - centralized mock data (moved from components)
3. **Modified**: `Dashboard.tsx` - use new detection
4. **Modified**: `TrackingResults.tsx` - import mock data from shared file
5. **Modified**: `BillsOfLadingResults.tsx` - import mock data from shared file
6. **Modified**: `BookingResults.tsx` - import mock data from shared file

