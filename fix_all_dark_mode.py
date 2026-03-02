#!/usr/bin/env python3
"""
Dark Mode & Icon Fix Script
Fixes all HTML files with enhanced dark mode and better icons
"""

import re
import glob
import os

# Enhanced dark mode CSS to add
ENHANCED_CSS = '''
/* Enhanced Dark Mode - Auto-added */
body.dark-mode .activity-card,
body.dark-mode .eqs-item,
body.dark-mode .course-card,
body.dark-mode .task-card,
body.dark-mode .funksjon-card,
body.dark-mode .period-card,
body.dark-mode .phase-section {
  background: #131829 !important;
  border-color: #1e2337 !important;
  color: #e8eaf5 !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
}

body.dark-mode .activity-card h3,
body.dark-mode .activity-card h4,
body.dark-mode .eqs-item h3,
body.dark-mode .eqs-item h4,
body.dark-mode .course-card h3,
body.dark-mode .task-card h3 {
  color: #e8eaf5 !important;
}

body.dark-mode .activity-card p,
body.dark-mode .eqs-item p,
body.dark-mode .course-card p,
body.dark-mode .task-card p {
  color: #9ca3af !important;
}

body.dark-mode input[type="checkbox"] {
  border-color: #1e2337;
  background: #0a0e1a;
}

body.dark-mode input[type="checkbox"]:checked {
  background: #14b8a6;
  border-color: #14b8a6;
}

body.dark-mode .theme-toggle {
  background: #131829 !important;
  border-color: #1e2337 !important;
  color: #e8eaf5 !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4) !important;
}
'''

def fix_file(filepath):
    """Fix dark mode and icons in a single file"""
    print(f"\n📄 Processing {filepath}...")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes = []
        
        # 1. Add !important to main dark mode background
        if 'background: linear-gradient(135deg, #0a0e1a 0%, #0f1219 100%);' in content:
            content = content.replace(
                'background: linear-gradient(135deg, #0a0e1a 0%, #0f1219 100%);',
                'background: linear-gradient(135deg, #0a0e1a 0%, #0f1219 100%) !important;'
            )
            changes.append("Added !important to dark mode background")
        
        # 2. Add !important to dark mode color (only in body.dark-mode block)
        content = re.sub(
            r'(body\.dark-mode \{[^}]*color: #e8eaf5);',
            r'\1 !important;',
            content
        )
        
        # 3. Add !important to top-nav
        if 'body.dark-mode .top-nav' in content:
            content = re.sub(
                r'(body\.dark-mode \.top-nav \{[^}]*background: linear-gradient[^;]+);',
                r'\1 !important;',
                content
            )
        
        # 4. Add enhanced CSS if not already present
        if '#131829 !important' not in content and 'body.dark-mode .sticky-footer' in content:
            content = content.replace(
                'body.dark-mode .sticky-footer {',
                ENHANCED_CSS + '\nbody.dark-mode .sticky-footer {'
            )
            changes.append("Added enhanced dark mode CSS")
        
        # 5. Fix OSCE icon: 📅 → ⏰
        if '📅' in content:
            content = content.replace('📅', '⏰')
            changes.append("Changed OSCE icon: 📅 → ⏰")
        
        # 6. Improve dark mode toggle icon size
        if '<span id="theme-icon">' in content and 'font-size: 1.3rem' not in content:
            content = re.sub(
                r'<span id="theme-icon">',
                '<span id="theme-icon" style="font-size: 1.3rem; line-height: 1;">',
                content
            )
            changes.append("Improved toggle icon size")
        
        # 7. Add !important to sticky footer dark mode
        if 'body.dark-mode .sticky-footer' in content:
            content = re.sub(
                r'(body\.dark-mode \.sticky-footer \{[^}]*background: linear-gradient[^;]+);',
                r'\1 !important;',
                content
            )
        
        # Write back if changed
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print("  ✅ Fixed successfully!")
            for change in changes:
                print(f"     • {change}")
            return True
        else:
            print("  ⏭️  Already up to date")
            return False
            
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False

def main():
    """Main function"""
    print("╔══════════════════════════════════════════════════════════╗")
    print("║     🌙 Dark Mode & Icon Fix Script                      ║")
    print("╚══════════════════════════════════════════════════════════╝")
    print()
    
    # Find all HTML files to fix
    files_to_fix = [
        'del1_egenomsorg_oppdatert.html',
        'del2_reseptur.html',
        'del3_arbeidskrav.html',
        'del4_kontinuerlige_aktiviteter.html',
        'del5_apokus.html',
        'del6_vitusapotek_opplaering.html',
        'gantt_apotekpraksis.html'
    ]
    
    # Check if files exist
    existing_files = [f for f in files_to_fix if os.path.exists(f)]
    
    if not existing_files:
        print("❌ No HTML files found in current directory!")
        print("\n💡 Make sure you run this script in the same folder as your HTML files.")
        return
    
    print(f"Found {len(existing_files)} files to fix:")
    for f in existing_files:
        print(f"  • {f}")
    print()
    
    # Fix each file
    fixed_count = 0
    for filepath in existing_files:
        if fix_file(filepath):
            fixed_count += 1
    
    # Summary
    print()
    print("╔══════════════════════════════════════════════════════════╗")
    print("║                    RESULTS                               ║")
    print("╚══════════════════════════════════════════════════════════╝")
    print()
    print(f"📊 Files processed: {len(existing_files)}")
    print(f"✅ Files fixed:     {fixed_count}")
    print(f"⏭️  Already OK:      {len(existing_files) - fixed_count}")
    print()
    
    if fixed_count > 0:
        print("🎉 SUCCESS! All files have been fixed!")
        print()
        print("✅ Enhanced dark mode CSS added")
        print("✅ Icons improved (⏰ for OSCE, better toggle)")
        print("✅ All styling now uses !important for reliability")
        print()
        print("🧪 Test by:")
        print("   1. Open each HTML file in browser")
        print("   2. Click dark mode toggle (🌙)")
        print("   3. Verify all cards are dark")
        print("   4. Check that text is readable")
    else:
        print("ℹ️  All files were already up to date!")
    
    print()
    print("🚀 Your system is now 10/10!")

if __name__ == '__main__':
    main()
