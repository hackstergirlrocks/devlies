import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

export default function ProfilModal({
    visible,
    onClose,
    skinUser,
    infoPlayer,
    infoGame,
    infoWin,
    infoLose,
    datePlayer,
    styles,
    isFriend,
    onAddAmi,
    onRemoveAmi,
    message,
    isMe,
    isRequest,
    onRemoveInvit,
    isSend,
    onAcceptInvit
}) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <ImageBackground
                source={require('../assets/HomePage/pop-up-windows-final.png')}
                resizeMode="contain"
                style={styles.image}
            >
                <View>
                    <TouchableOpacity onPress={onClose} style={{ width: 330, bottom: 12, left: 27 }}>
                        <Image
                            source={require('../assets/HomePage/croix-bleu-pop-up.png')}
                            style={{ left: 10, height: 22, width: 22 }}
                        />
                    </TouchableOpacity>
                </View>

                {/* Contenu profil */}
                <View style={{ width: 330, height: 515, justifyContent: 'center', left: 30 }}>
                    {/* Skin + infos de base */}
                    <View>
                        <View style={[styles.infoUser, { flexDirection: 'row', height: 170 }]}>
                            <ImageBackground
                                source={require('../assets/HomePage/icone-pop-up-windows-final.png')}
                                style={styles.encardskin}
                            >
                                <Image style={styles.skinuser} source={skinUser} />
                            </ImageBackground>
                            <View style={{ alignItems: 'center', justifyContent: 'center', width: 125, height: 150 }}>
                                <Text style={{ fontFamily: 'Minecraft', fontSize: 25 }}>{infoPlayer.username}</Text>
                                <Text style={{ fontFamily: 'Minecraft', fontSize: 20 }}>level {infoPlayer.level}</Text>
                                <Text style={{ fontFamily: 'Minecraft', fontSize: 20 }}>{infoPlayer.experience} xp</Text>
                            </View>
                        </View>
                    </View>

                    {/* Stats */}
                    <View style={{ width: 330, height: 345, justifyContent: 'center', gap: 10 }}>
                        {isMe ? (
                            <StatItem
                                icon={require('../assets/HomePage/icone-coin.png')}
                                text={infoPlayer.coins <= 1 ? `${infoPlayer.coins} coin` : `${infoPlayer.coins} coins`}
                                styles={styles}
                            />
                        ) : isFriend ? (
                            <TouchableOpacity onPress={onRemoveAmi}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Minecraft', fontSize: 15, bottom: 25, color: 'green' }}>{message}</Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'Minecraft', fontSize: 20, bottom: 15, color: 'brown' }}>Supprimer de la liste d'ami</Text>
                            </TouchableOpacity>
                        ) : isSend ? (
                            <TouchableOpacity onPress={onRemoveInvit}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Minecraft', fontSize: 15, bottom: 25, color: 'green' }}>{message}</Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'Minecraft', fontSize: 20, bottom: 15, color: 'brown' }}>Supprimer l'invitation d'ami</Text>
                            </TouchableOpacity>
                        ) : isRequest ? (
                            <TouchableOpacity onPress={onAcceptInvit}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Minecraft', fontSize: 15, bottom: 25, color: 'green' }}>{message}</Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'Minecraft', fontSize: 20, bottom: 15, color: 'blue' }}>Accepter l'invitation</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={onAddAmi}>
                                <Text style={{ textAlign: 'center', fontFamily: 'Minecraft', fontSize: 15, bottom: 25, color: 'green' }}>{message}</Text>
                                <Text style={{ textAlign: 'center', fontFamily: 'Minecraft', fontSize: 20, bottom: 15, color: 'blue' }}>Ajouter en ami</Text>
                            </TouchableOpacity>
                        )}
                        <StatItem
                            icon={require('../assets/HomePage/icone-manette.png')}
                            text={infoGame <= 1 ? `${infoGame} game` : `${infoGame} games`}
                            styles={styles}
                        />
                        <StatItem
                            icon={require('../assets/HomePage/icone-coupe.png')}
                            text={infoWin <= 1 ? `${infoWin} win` : `${infoWin} wins`}
                            styles={styles}
                        />
                        <StatItem
                            icon={require('../assets/HomePage/icone-crane.png')}
                            text={infoLose <= 1 ? `${infoLose} lose` : `${infoLose} loses`}
                            styles={styles}
                        />
                        <StatItem
                            icon={require('../assets/HomePage/icone-horloge.png')}
                            text={(() => {
                                const date = new Date(datePlayer);
                                return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
                            })()}
                            styles={styles}
                        />
                    </View>
                </View>
            </ImageBackground>
        </Modal >
    );
}

// Composant pour chaque ligne de stats
function StatItem({ icon, text, styles }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={icon} style={styles.icone} />
            <Text style={{ fontFamily: 'Minecraft', fontSize: 20, left: 30 }}>{text}</Text>
        </View>
    );
}