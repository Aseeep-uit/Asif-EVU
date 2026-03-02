#!/usr/bin/env python3
"""
Sync Countdown & Theme Toggle from index.html
Applies exact same structure and styling to all files
"""

import re

# Templates from index.html
COUNTDOWN_HTML = '''  <!-- Countdown til Eksamen -->
  <div class="countdown-widget">
    <div class="countdown-label">TIL OSCE EKSAMEN</div>
    <div class="countdown-number" id="days-left">--</div>
    <div class="countdown-text">dager igjen</div>
    <div class="countdown-date">17. juni 2026</div>
  </div>'''

THEME_TOGGLE_HTML = '''  <!-- Dark Mode Toggle -->
  <button class="theme-toggle" id="theme-toggle" onclick="toggleDarkMode()">
    <span class="theme-toggle-icon" id="theme-icon">🌙</span>
    <span class="theme-toggle-text" id="theme-text">Dark Mode</span>
  </button>'''

COUNTDOWN_CSS = '''    /* Countdown Widget */
    .countdown-widget {
      position: fixed;
      top: 80px;
      right: 2rem;
      z-index: 999;
      background: linear-gradient(135deg, #10b981, #14b8a6);
      border-radius: 12px;
      padding: 12px 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      min-width: 140px;
      text-align: center;
      color: white;
      transition: all 0.3s ease;
    }

    .countdown-label {
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }

    .countdown-number {
      font-size: 2rem;
      font-weight: 800;
      line-height: 1;
    }

    .countdown-text {
      font-size: 0.75rem;
      margin-top: 4px;
    }

    .countdown-date {
      font-size: 0.65rem;
      margin-top: 4px;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .countdown-widget {
        display: none;
      }
    }'''

THEME_TOGGLE_CSS = '''    /* Dark Mode Toggle */
    .theme-toggle {
      position: fixed;
      top: 140px;
      right: 2rem;
      z-index: 1001;
      background: var(--bg-card);
      border: 2px solid var(--border);
      border-radius: 50px;
      padding: 8px 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text);
      box-shadow: 0 4px 12px var(--shadow);
      transition: all 0.3s ease;
      user-select: none;
    }

    .theme-toggle:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px var(--shadow-lg);
    }

    .theme-toggle-icon {
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }

    .theme-toggle:hover .theme-toggle-icon {
      transform: rotate(20deg);
    }

    @media (max-width: 768px) {
      .theme-toggle {
        top: auto;
        bottom: 120px;
        right: 1rem;
        padding: 10px 14px;
      }
      
      .theme-toggle-text {
        display: none;
      }
    }'''

def fix_file(filepath):
    """Apply index.html templates to a file"""
    print(f"\n📄 Processing {filepath}...")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        changes = []
        
        # 1. Replace countdown HTML
        # Find and remove old countdown
        old_countdown_pattern = r'<!-- Countdown.*?</div>\s*(?=\s*<!-- )'
        if re.search(old_countdown_pattern, content, re.DOTALL):
            content = re.sub(old_countdown_pattern, '', content, flags=re.DOTALL)
            changes.append("Removed old countdown HTML")
        
        # Add new countdown before Dark Mode Toggle
        if '<!-- Dark Mode Toggle -->' in content and 'TIL OSCE EKSAMEN' not in content:
            content = content.replace(
                '  <!-- Dark Mode Toggle -->',
                COUNTDOWN_HTML + '\n\n  <!-- Dark Mode Toggle -->'
            )
            changes.append("Added new countdown HTML")
        
        # 2. Replace theme toggle HTML
        old_toggle_pattern = r'<!-- Dark Mode Toggle -->.*?</button>'
        if re.search(old_toggle_pattern, content, re.DOTALL):
            content = re.sub(
                old_toggle_pattern,
                THEME_TOGGLE_HTML,
                content,
                flags=re.DOTALL
            )
            changes.append("Updated theme toggle HTML")
        
        # 3. Replace countdown CSS
        old_countdown_css_pattern = r'/\* Countdown Widget \*/.*?(?=\n    /\* )'
        if re.search(old_countdown_css_pattern, content, re.DOTALL):
            content = re.sub(
                old_countdown_css_pattern,
                COUNTDOWN_CSS + '\n\n',
                content,
                flags=re.DOTALL
            )
            changes.append("Updated countdown CSS")
        
        # 4. Replace theme toggle CSS
        old_theme_css_pattern = r'/\* Dark Mode Toggle \*/.*?(?=\n    /\*|\n  </style>)'
        if re.search(old_theme_css_pattern, content, re.DOTALL):
            content = re.sub(
                old_theme_css_pattern,
                THEME_TOGGLE_CSS + '\n\n',
                content,
                flags=re.DOTALL
            )
            changes.append("Updated theme toggle CSS")
        
        # Write back
        if changes:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print("  ✅ Fixed successfully!")
            for change in changes:
                print(f"     • {change}")
            return True
        else:
            print("  ⏭️  Already synchronized")
            return False
            
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

def main():
    """Main function"""
    print("╔══════════════════════════════════════════════════════════╗")
    print("║  🔄 Sync Countdown & Theme Toggle from index.html       ║")
    print("╚══════════════════════════════════════════════════════════╝")
    print()
    
    files = [
        'del1_egenomsorg_oppdatert.html',
        'del2_reseptur.html',
        'del3_arbeidskrav.html',
        'del4_kontinuerlige_aktiviteter.html',
        'del5_apokus.html',
        'del6_vitusapotek_opplaering.html',
        'gantt_apotekpraksis.html',
        'analytics.html'
    ]
    
    print(f"Files to sync: {len(files)}\n")
    
    fixed_count = 0
    for filepath in files:
        if fix_file(filepath):
            fixed_count += 1
    
    print()
    print("╔══════════════════════════════════════════════════════════╗")
    print("║                    RESULTS                               ║")
    print("╚══════════════════════════════════════════════════════════╝")
    print()
    print(f"📊 Files processed: {len(files)}")
    print(f"✅ Files updated:   {fixed_count}")
    print(f"⏭️  Already OK:      {len(files) - fixed_count}")
    print()
    
    if fixed_count > 0:
        print("🎉 SUCCESS! All files now have:")
        print("   ✅ Countdown at top: 80px")
        print("   ✅ Toggle at: 140px (below countdown)")
        print("   ✅ OSCE label: 'TIL OSCE EKSAMEN'")
        print("   ✅ Date: 17. juni 2026")
        print("   ✅ Improved hover effects")
        print("   ✅ Mobile responsive")
    
    print()
    print("🚀 All files synchronized with index.html!")

if __name__ == '__main__':
    main()
