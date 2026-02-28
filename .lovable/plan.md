

## Plan: Add Search Filtering to Show Only Matching Results

### Problem
Currently, when you type a container number (e.g., "TCLU9988776") or a B/L number (e.g., "MSKU12345"), the app switches to the correct tab but displays **all 20 results** instead of filtering to just the matching ones.

### Solution
Add filtering logic inside each results component so that when a search query is entered, only results matching the query are shown. When no search query is present, all results display as before.

### Changes

**1. TrackingResults.tsx** -- Filter containers by ID
- Filter `mockTracking` against `searchQuery`, matching on the container `id` field (case-insensitive)
- If `searchQuery` is empty or has no tracking-related keywords, show all results
- Show a "No results found" message if the filter returns nothing

**2. BillsOfLadingResults.tsx** -- Filter B/Ls by number, reference, and customer
- Filter `mockBLs` against `searchQuery`, matching on `id`, `reference`, `customer`, and `containers` array (case-insensitive)
- Same empty/no-match handling

**3. BookingResults.tsx** -- Filter bookings by ID, customer, and reference
- Filter `mockBookings` against `searchQuery`, matching on `id`, `customer`, and `reference` (case-insensitive)
- Same empty/no-match handling

**4. CargoSpaceResults.tsx** -- Apply same pattern for cargo space results

### How Filtering Works
Each component will:
1. Extract relevant keywords from `searchQuery` (stripping filler words like "track", "container", "bill", "lading", "retrieve", "show", "booking", "for", "customer", etc.)
2. Filter the mock data array to entries where any searchable field contains the remaining keyword(s)
3. If no meaningful keywords remain after stripping, show all results
4. Display a friendly "No matching results" message when the filter produces zero results

### Technical Details
- Filtering happens inside each component using `useMemo` for performance
- A shared helper function extracts search terms by removing common filler/command words
- Matching is case-insensitive and partial (e.g., "TCLU" matches "TCLU9988776")

